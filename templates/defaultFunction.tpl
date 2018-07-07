    where<%=nameInFunction%>: function(value) {
        this._query.addQuery("<%= fieldName %>", value);
        return this;
    },

    where<%=nameInFunction%>OrNull: function(value) {
        this._query
            .addNullQuery("<%= fieldName %>")
            .addOrCondition("<%= fieldName %>", value);
        return this;
    },

    where<%=nameInFunction%>NotNull: function() {
        this._query.addNotNullQuery("<%= fieldName %>");
        return this;
    },

    where<%=nameInFunction%>Null: function() {
        this._query.addNullQuery("<%= fieldName %>");
        return this;
    },
