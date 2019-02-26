module Todo
  class Tasks < Grape::API
    resource "tasks" do
      before do
        authenticate_user!
      end

      desc "List tasks"
      get do
        current_user.tasks.all
      end

      desc "Return a task"
      params do
        requires :id, type: Integer, desc: "Task ID"
      end
      route_param :id do
        get do
          current_user.tasks.find(params[:id])
        end
      end

      desc "Create a task"
      params do
        requires :description, type: String, desc: "A description of your task"
      end
      post do
        task = current_user.tasks.create(description: params[:description])
        task
      end

      desc "Update a task"
      params do
        requires :id, type: Integer, desc: "Task ID"
        optional :description, type: String, desc: "A description of your task"
        optional :completed, type: Boolean, desc: "Is the task completed?"
      end
      patch ":id" do
        task = current_user.tasks.find(params[:id])
        task.description = params[:description] if params[:description]
        task.completed = params[:completed] unless params[:completed].nil?
        task.save!
        task
      end

      desc "Delete a task."
      params do
        requires :id, type: Integer, desc: "Task ID"
      end
      delete ":id" do
        task = current_user.tasks.find(params[:id])
        task.destroy!
        head 204
      end
    end
  end
end
