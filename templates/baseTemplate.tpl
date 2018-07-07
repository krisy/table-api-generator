var BCG_VCT_<%= className %>QueryBuilder = Class.create();

BCG_VCT_<%= className %>QueryBuilder.prototype = {
    initialize: function() {
        this._query = new GlideRecord("<%= tableName %>");
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
