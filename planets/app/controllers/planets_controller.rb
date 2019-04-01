class PlanetsController < ApplicationController
	def index
		@planets=Planet.all


	end

	def show
		@planet=Planet.find(params.require(:id))
	end

	def create
		Planet.create!(params.require(:planet).permit(:name, :size, :description, :ordinality, :distance))
		redirect_to planets_url
	end
end