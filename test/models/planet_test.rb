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

require 'test_helper'

class PlanetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
