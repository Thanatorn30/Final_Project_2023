module.exports = (req,res,next)=>{
    res.status(404).json({message:'Data not found'})
}