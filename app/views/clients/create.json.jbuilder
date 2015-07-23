
json.organization do
  json.name @organization.name
  json.id @organization.id
  json.errors @organization.errors

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
end