class Addnullconstraint < ActiveRecord::Migration
  def change
    change_column :users, :age, :integer, null: false
    change_column :users, :weight, :integer, null: false
  end
end
