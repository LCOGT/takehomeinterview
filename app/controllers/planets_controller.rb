class PlanetsController < ApplicationController
  def index
    @planets = Planet.all
  end

  def new
    @planet = Planet.new
  end

  def create
    @planet = Planet.new(planet_params)
    if @planet.save
      render :index
    else
      render 'new'
    end
  end

  private

  def planet_params
     params.require(:planet).permit(:name, :size, :distance, :ordinality, :description)
  end
end
