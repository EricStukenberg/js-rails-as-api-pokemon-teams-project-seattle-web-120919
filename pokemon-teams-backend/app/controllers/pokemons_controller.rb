require 'faker'
class PokemonsController < ApplicationController

    def index 
        @pokemons= Pokemon.all
        render json: @pokemons
    end

    def show 
        @pokemon = Pokemon.find(params[:id])
        render json: @pokemon
    end

    def new 
        @pokemon = Pokemon.new

    end

    def create 
        

        @trainer = Trainer.find(params[:trainer_id])
        if (@trainer.pokemons.length < 6)
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            @pokemon = Pokemon.new(species: species, nickname: name, trainer_id: @trainer.id)
            @pokemon.save
            render json: @pokemon
        end
    end

    def destroy
        @pokemon = Pokemon.find(params[:id])
        @pokemon.destroy
    end
end
