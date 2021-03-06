class Organization < ActiveRecord::Base
  resourcify
  has_many :users
  has_many :addresses, as: :addressable
  has_many :phones, as: :callable
  has_many :emails, as: :emailable
  has_many :project_orgs
  has_many :projects, through: :project_orgs
  has_many :owned_projects, class_name: 'Project', foreign_key: :owner_id
  has_many :invoices, through: :owned_projects
  has_many :partners

  # vendors
  has_many :partner_vendor, foreign_key: :organization_id, class_name: 'Partner'
  has_many :vendors, through: :partner_vendor, source: :vendors

  has_many :partners_vendor_client, foreign_key: :vendor_id, class_name: 'Partner'
  has_many :vendor_clients, through: :partners_vendor_client, source: :vendor_clients
  # clients
  has_many :partner_client, foreign_key: :organization_id, class_name: 'Partner'
  has_many :clients, through: :partner_client, source: :clients

  has_many :partner_managers, foreign_key: :client_id, class_name: 'Partner'
  has_many :managers, through: :partner_managers, source: :managers

  def all_related_orgs with_names: false
    names = ''
    names = 'o2.name, ' if with_names
    ActiveRecord::Base.connection.exec_query("SELECT #{names}o2.id FROM organizations o JOIN partners p ON (p.organization_id = o.id) JOIN organizations o2 ON (o2.id = p.vendor_id OR o2.id = p.client_id) WHERE o.id = #{self.id}").rows
  end

end
