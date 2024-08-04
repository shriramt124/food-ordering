

export function formatCurrency(value){
    return new Intl.NumberFormat("en",{
        style:"currency",
        currency:"INR"
    }).format(value)
}
