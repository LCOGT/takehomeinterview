# == Schema Information
#
# Table name: planets
#
#  id          :integer          not null, primary key
#  name        :string
#  size        :float
#  distance    :float
#  ordinality  :integer
#  description :text
#

class Planet<ActiveRecord::Base
	validates :ordinality, :size, :distance, numericality: true
	validates :name, :ordinality, uniqueness: true


end