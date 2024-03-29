({
    loadList: function(component) {
        const action = component.get("c.allSymptomsWithSimilarName");
        // A storable action is a server action whose response is stored in the client cache so that subsequent requests
        // for the same server method with the same set of arguments can be accessed from that cache.
        action.setStorable();

        // For the initial search, use empty string.
        const nameFilterString = component.find("nameFilter").get("v.value");

        if (nameFilterString === undefined) {
            return;
        }
        
        action.setParams({
            name: nameFilterString
        });

        action.setCallback(this, function(response) {
            var symps = response.getReturnValue();
            component.set("v.symptoms", response.getReturnValue());
        });
        
        $A.enqueueAction(action);
    }
})