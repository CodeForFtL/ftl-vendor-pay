require 'openssl'
   OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE

class VendorsController < ApplicationController
  def index    
    response = HTTParty.get('https://opendata.demo.socrata.com/resource/ixay-a4di.json?$select=vendor_name,%20sum(amount)&$group=vendor_name&$order=sum_amount%20DESC&$limit=25')
    @parsed_json = JSON.parse(response.body)
    @vendor_hash = {}
    @parsed_json.each { |n| @vendor_hash[n['vendor_name']] = n['sum_amount'] }
  end
end