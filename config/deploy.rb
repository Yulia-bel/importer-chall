# config/deploy.rb

# Capistrano version lock
lock '~> 3.18.0'

# Application and repository details
set :application, 'importer-challenge'
set :repo_url, 'git@github.com:yulia-bel/importer-challenge.git'
set :deploy_to, '/home/admin/importer-challenge'

set :passenger_restart_with_sudo, true

# Define custom tasks
namespace :deploy do
  desc 'Default deployment task including custom tasks'
  task :all do
    invoke 'deploy:started'
    invoke 'git:check'
    invoke 'deploy:check:directories'
    invoke 'git:update'
    invoke 'deploy:set_current_revision'
    invoke 'git:create_release'
    invoke 'deploy:read'   # custom 'read' task
    invoke 'deploy:write'  # custom 'write' task
    invoke 'deploy:finishing'
    invoke 'deploy:cleanup'
    invoke 'restart_nginx' # custom 'restart_nginx' task
    invoke 'deploy:finished'
  end

  desc 'Deploy and build the read service'
  task :read do
    on roles(:app) do
      within release_path.join('read') do
        execute :npm, 'install'
        execute :npm, 'run build'
      end
    end
  end

  desc 'Deploy and build the write service'
  task :write do
    on roles(:app) do
      within release_path.join('write') do
        execute :npm, 'install'
        execute :npm, 'run build'
      end
    end
  end
end

task :restart_nginx do
  on roles(:app), in: :sequence, wait: 5 do
    execute 'sudo service nginx restart'
  end
end
