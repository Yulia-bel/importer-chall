# config valid for current version and patch releases of Capistrano
lock '~> 3.18.0'

set :application, 'importer-challenge'
set :repo_url, 'git@github.com:yulia-bel/importer-challenge.git'
set :deploy_to, '/home/admin/importer-challenge'

set :passenger_restart_with_sudo, true


# Define Capistrano tasks
namespace :deploy do
  desc 'Deploy and build the read service'
  task :read do
      within release_path.join('read') do
        execute :npm, 'build'
      end
    end

  desc 'Deploy and build the write service'
  task :write do
      within release_path.join('write') do
        execute :npm, 'build'
      end
    end
end

after 'deploy:cleanup', 'restart_nginx'

task :restart_nginx do
    on roles(:app), in: :sequence, wait: 5 do
        execute 'sudo service nginx restart'
    end
end
