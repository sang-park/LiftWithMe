class HomeCity < ActiveRecord::Base
  validates :name, presence: true

  has_many :gyms
  
  has_many :users,
    through: :gyms,
    source: :users
end
