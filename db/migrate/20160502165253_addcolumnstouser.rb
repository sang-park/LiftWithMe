class Addcolumnstouser < ActiveRecord::Migration
  def change
    add_column :users, :profile_image_url, :string
    add_column :users, :age, :integer
    add_column :users, :weight, :integer
  end
end
