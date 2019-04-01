class PlanetsController < ApplicationController
	def index
		@planets = Planet.all
	end

	def show
		@planet = Planet.find(params.require(:id))
	end

	def create
		planet = Planet.new(params.require(:planet).permit(:name, :size, :description, :ordinality, :distance))
		if planet.save
			redirect_to planets_url
		else
			flash[:error] = planet.errors
			redirect_to planets_url
		
		end
	end
end