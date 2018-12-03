var fbImage = (arg) => 'image_'+arg
var fbName = (arg) => 'name_'+arg
var getUID = (arg) => arg.substring(4)
var fbUID = (arg) => 'uid_'+arg
var isUID = (arg) => {
    let answer = false
    if (arg.substring(0,4)== 'uid_') {
        answer = true
    }
    return answer
}

var belongToOtherUser = (arg, my_uid) => {
    // return false because belongs to neither user
    if (getPrefix(arg) == "self"){
        return false
    }
    var n = arg.indexOf('_')
    var someUid = arg.substring(n+1)
    // get whatever trails after _ and see if it is the other users
    if (someUid == my_uid){
        return false
    }
    return true 
}

var getPrefix = (arg) => {
    var n = arg.indexOf('_')
    return arg.substring(0,n)
}

var isOtherUID = (arg, payload) => {
    if (arg == fbUID(payload)){
        return false
    }
    return true
}
var isFriend = (relation) => {
    // assume they are friends
    let answer = true
    for(var property in relation.data() ) {
        if(isUID(property)) {
            if(relation.data()[property] !== 'true'){// check if they aren't
                answer = false
            }
        }
    }
    return answer
}
var isRequest = (relation, my_uid) => {
    // assume it is a request
    //let answer = true
    for(var property in relation.data() ) {
        // check if user
        if (isUID(property)){
            // check if different user
            if(isOtherUID(property, my_uid)) {
                // now see if that other user is true AND that we are false 
                if(relation.data()[property] === 'true' && relation.data()[fbUID(my_uid)] === 'false'){
                    return true
                }
            }
        }
    }
    return false
}
var changeTypeIsFriendship = (original, change) => {
    let answer = false
    for(var property in original.data()) {
        if(isUID(property)){
            if(original.data()[property] !== change.data()[property]){
                answer = true
            } 
        }
    }
}
module.exports = {
    fbImage: fbImage,
    fbName: fbName,
    getUID: getUID,
    fbUID: fbUID,
    isUID: isUID,
    belongToOtherUser: belongToOtherUser,
    getPrefix: getPrefix,
    isOtherUID: isOtherUID,
    isFriend: isFriend,
    isRequest: isRequest,
    changeTypeIsFriendship: changeTypeIsFriendship,
}