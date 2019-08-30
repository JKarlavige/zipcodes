const Sort = require('../../../models/Sort')

// STRICTLY FOR MANUALLY ENTERING
module.exports = (req, res) => {
  let startZip = 550
  let endZip = 568
  for(z = startZip; z < endZip; z++) {
    let curZip = JSON.stringify(z)
    // curZip = '0'.concat(z)

    const planFields = {}
    planFields.zipcode = curZip
    if(req.body.destinationId) planFields.destinationId = req.body.destinationId
    if (typeof req.body.serviceLevel !== 'undefined') {
      planFields.serviceLevel = req.body.serviceLevel.split(',');
    }

      Sort.find({ zipcode: curZip })
      .then(sort => {
        if(Object.keys(sort).length > 0) {
          for(i = 0; i < sort.length; i++) {
            if(planFields.destinationId === sort[i].destinationId) {
              console.log(planFields)
              Sort.findOneAndUpdate(
                { _id: sort[i].id },
                {$set: planFields },
                { new: true }
              )
            } else {
              new Sort(planFields).save()
              break
            }
          }
        } else {
          new Sort(planFields).save()
        }
      })  
  }
}