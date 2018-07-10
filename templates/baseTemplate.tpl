var BCG_VCT_<%= className %>QueryBuilder = Class.create();

BCG_VCT_<%= className %>QueryBuilder.prototype = {
    initialize: function() {
        this._table = "<%= tableName %>";
        this._query = new GlideRecord(this._table);
    },

    addEncodedQuery: function(encodedQuery) {
        //note: check fields in encoded query - BCG_VCT_FieldValidator.validate
        this._query.addEncodedQuery(encodedQuery);
        return this;
    },

    query: function() {
        this._query.query();
        return this.getQuery();
    },

    getQuery: function() {
        return this._query;
    },

<%= generatedCode %>
};
