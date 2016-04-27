class Gym < ActiveRecord::Base
  validates :name, :home_city_id, presence: true

  belongs_to :home_city
  has_many :users
end
