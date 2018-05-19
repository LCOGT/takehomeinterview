require 'test_helper'

class PlanetsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get planets_index_url
    assert_response :success
  end

end
