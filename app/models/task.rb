class Task < ApplicationRecord
  belongs_to :user, inverse_of: :tasks

  validates :description, presence: true
end
