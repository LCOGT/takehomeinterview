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

end
