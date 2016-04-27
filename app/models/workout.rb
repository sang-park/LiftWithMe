class Workout < ActiveRecord::Base
  validates :name, :user_id, :date, :time, presence: true

  belongs_to :user
  belongs_to :buddy,
    foriegn_key: :buddy_id,
    class_name: :User
  has_many :exercises
end
