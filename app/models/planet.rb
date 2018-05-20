# == Schema Information
#
# Table name: planets
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  size        :float
#  distance    :float
#  ordinality  :integer          not null
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Planet < ApplicationRecord
  before_save { name.downcase! }
  validates :name,
            presence: true,
            uniqueness: true
  validates :size,
            numericality: true,
            :unless => Proc.new {|e| e.size.blank?}
  validates :distance,
            numericality: true,
            :unless => Proc.new {|e| e.distance.blank?}
  validates :ordinality,
            numericality: { only_integer: true},
            presence: true,
            uniqueness: true,
            :unless => Proc.new {|e| e.distance.blank?}
end
