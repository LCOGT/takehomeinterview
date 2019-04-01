class PlanetsController < ApplicationController
	def index
		@planets=Planet.all


	end

	def show
		@planet=Planet.find(params.require(:id))
	end

	def create
		binding.pry()
	end
end