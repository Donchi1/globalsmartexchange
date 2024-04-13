const FORMTER = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency',
})

export default function formatCurrency(currency:number) {
  return FORMTER.format(currency)
}


