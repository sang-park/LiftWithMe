class WorkoutExercise < ActiveRecord::Base
  validates :workout_id, :exercise_id, :sets, :reps, presence: true
  validates :sets, :reps, numericality: { greater_than: 0, only_integer: true }
  validates_uniqueness_of :exercise_id, :scope => [:workout_id]

  belongs_to :workout
  belongs_to :exercise

  def self.find_all_in_workout(workout_id)
    WorkoutExercise.all.select do |we|
      we.workout_id == workout_id
    end
  end

  def self.destory_all_in_workout(workout_id)
    WorkoutExercise.find_all_in_workout(workout_id).each do |we|
      we.destroy
    end
  end

end
