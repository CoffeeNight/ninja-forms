define( ['models/calcModel'], function( CalcModel ) {
	var collection = Backbone.Collection.extend( {
		model: CalcModel,
		comparator: 'order',

		initialize: function( models, options ) {
			this.options = options;
            _.each( models, function( model ) {
                if ( '' === model.dec ) model.dec = 0;
                model.dec = parseInt( model.dec );
            } );
			/*
			 * Respond to requests for our calc model
			 */
			nfRadio.channel( 'form-' + options.formModel.get( 'id' ) ).reply( 'get:calc', this.getCalc, this );
		},

		getCalc: function( key ) {
			return this.findWhere( { name: key } );
		}
	} );
	return collection;
} );