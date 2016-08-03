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

  def self.remove_extras(workout_id, existing_we)
    remove = WorkoutExercise.find_all_in_workout(workout_id).select do |we|
      !existing_we.include?(we.id)
    end
    remove.each {|we| we.destroy}
  end

end
