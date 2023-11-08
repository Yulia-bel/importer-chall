server '54.83.242.193', user: 'admin', roles: %w{web app db}, primary: true
set :ssh_options, forward_agent: true
set :branch, 'main'
