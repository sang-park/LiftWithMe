class Addcolumntogym < ActiveRecord::Migration
  def change
    add_column :gyms, :logo_url, :string
  end
end
