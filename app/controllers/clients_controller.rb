class ClientsController < ApplicationController
  before_action :set_organization, only: [:update]
  before_filter :authenticate_account!

  def index
    organization = current_account.user.organization.clients
    if current_account.has_role? :manager, current_account.user.organization
      @organization = organization
    else
      projects = Project.with_role(:employee, current_account).pluck(:id)
      authorize_orgs = Project.where(owner_id: @organization, id: projects).joins(:project_orgs)
      @organization = (organization & authorize_orgs)
    end
  end

  def show
    @organization = Organization.includes(:projects).find(params[:id])
    respond_to do |format|
      format.json
    end
  end

  def create
    org, address, phone = create_params
    @organization = Organization.create(org)
    @organization.addresses << Address.create(address)
    @organization.phones << Phone.create(phone)
    if @organization.save
      current_account.user.organization.clients << @organization
    end
  end

  def update
    org, address, phone = edit_params
    @organization.update(org)
    @organization.addresses.first.update(address)
    @organization.phones.first.update(phone)
    if @organization.save
      current_account.user.organization.clients << @organization if params[:partner_type] == 'client'
    end
  end

  private

  def set_organization
    @organization = Organization.find(params[:id])
  end

  def create_params
    r = params.require(:organization).permit(:name, address: [:street_address, :street_address2, :city, :state, :zip], phone: [:phone])
    [
        {name: r[:name]},
        {street_address: r[:address][:street_address], street_address2: r[:address][:street_address2], city: r[:address][:city], state: r[:address][:state], zip: r[:address][:zip]},
        {phone_number: r[:phone][:phone]}
    ]
  end

  def edit_params
    r = params.require(:organization).permit(:name, :id, address: [:id, :street_address, :street_address2, :city, :state, :zip], phone: [:id, :phone])
    [
        {id: r[:id], name: r[:name]},
        {id: r[:address][:id], street_address: r[:address][:street_address], street_address2: r[:address][:street_address2], city: r[:address][:city], state: r[:address][:state], zip: r[:address][:zip]},
        {id: r[:phone][:id], phone_number: r[:phone][:phone]}
    ]
  end

  def org_params
    params.permit(:name)
  end

  def address_params
    params.permit(:street_address, :street_address2, :city, :state, :zip)
  end

  def phone_params
    params.permit(:phone_number)
  end

end
