
json.organizations @organization do |org|
  json.id org.id
  json.name org.name
  json.number_of_projects org.projects.where(owner_id: current_account.user.organization.id).count
end