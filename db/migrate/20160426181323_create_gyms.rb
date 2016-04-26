class CreateGyms < ActiveRecord::Migration
  def change
    create_table :gyms do |t|
      t.string :name, null: false
      t.integer :home_city_id, null: false

      t.timestamps null: false
    end
    add_index :gyms, :home_city_id
  end
end
