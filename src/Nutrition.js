function Nutrition ({ label, unit, quantity }) {
    return (
    <div>
        <p className="nutritionFacts"><b>{label}</b> - {quantity.toFixed(2)} {unit}</p>
    </div>
    )
}
export default Nutrition;