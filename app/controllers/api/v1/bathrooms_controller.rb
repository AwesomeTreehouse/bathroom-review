module Api
  module V1
    class BathroomsController < ApplicationController
      def index
        bathrooms = Bathroom.all
        render json: { status: 'SUCCESS', message: 'Loaded articles', bathrooms: bathrooms }, status: :ok
      end
    end
  end
end
