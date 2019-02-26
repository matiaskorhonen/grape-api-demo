module Todo
  class Tasks < Grape::API
    resource "tasks" do
      before do
        authenticate_user!
      end

      desc "List tasks"
      get do
        []
      end

      desc "Return a task"
      params do
        requires :id, type: Integer, desc: "Task ID"
      end
      route_param :id do
        get do
        end
      end

      desc "Create a task"
      params do
        requires :description, type: String, desc: "A description of your task"
      end
      post do
      end

      desc "Update a task"
      params do
        requires :id, type: Integer, desc: "Task ID"
        optional :description, type: String, desc: "A description of your task"
        optional :completed, type: Boolean, desc: "Is the task completed?"
      end
      patch ":id" do
      end

      desc "Delete a task."
      params do
        requires :id, type: Integer, desc: "Task ID"
      end
      delete ":id" do
      end
    end
  end
end
