
json.organization do
  json.name @organization.name
  json.id @organization.id

  json.address do
    json.id @organization.addresses.first.id
    json.street_address @organization.addresses.first.street_address
    json.street_address2 @organization.addresses.first.street_address2
    json.city @organization.addresses.first.city
    json.state @organization.addresses.first.state
    json.zip @organization.addresses.first.zip
  end

  json.phone do
    json.id @organization.phones.first.id
    json.phone @organization.phones.first.phone_number
  end

  json.projects @organization.projects.where(owner_id: current_account.user.organization.id) do |project|
    json.id project.id
    json.name project.name
    json.identifier project.identifier
    json.owner_id project.owner_id
  end
end