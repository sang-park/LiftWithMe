class Workout < ActiveRecord::Base
  validates :name, :user_id, :date, :time, presence: true

  belongs_to :user
  belongs_to :buddy,
    foreign_key: :buddy_id,
    class_name: :User

  has_many :workout_exercises
  
  has_many :exercises,
    through: :workout_exercises,
    source: :exercise
end
