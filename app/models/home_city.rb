class HomeCity < ActiveRecord::Base
  validates :name, presence: true
end