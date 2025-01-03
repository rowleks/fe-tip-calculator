const form = document.getElementById('form')
const amountElem = document.getElementById('tip-amount')
const totalElem = document.getElementById('total')
const radios = document.querySelectorAll('input[type="radio"]')
const numbers = document.querySelectorAll('input[type="number"]')
const errSpan = document.querySelectorAll('.error')
const btn = document.getElementById('btn')
const customInput = document.getElementById('custom')

const data = { }

function handleReset(e) {
    e.preventDefault();
    const fields = e.target.querySelectorAll('input')
    fields.forEach(field => { 
        if(field.type === 'radio') { field.checked = false }
        else { field.value = '' }
    })
    amountElem.textContent = '$0.00'
    totalElem.textContent = '$0.00'
    for(const key in data) { data[key] = null}
    numbers.forEach(n => n.classList.remove('err'))
    errSpan.forEach(s => s.classList.remove('show'))
    btn.setAttribute('disabled', 'true')
}

function displayTotal(e) {

    data[e.target.name] = parseFloat(e.target.value);

    if (e.target.id === 'custom') { radios.forEach(radio => 
        radio.checked = false) }
    if (e.target.type === 'radio') { customInput.value = ""}
    if (e.target.id === 'bill')
    { 
        if(e.target.value.includes('.'))
        {
            e.target.value = e.target.value.replace(/(\.\d{2})\d+$/, '$1')
        }
    }

    let tipAmount;
    let total;

    if (data.amount && data.tip && data.people)
    {
        tipAmount = (data.amount * data.tip/100) / data.people
        total = (data.amount / data.people) + tipAmount
    }

    if (tipAmount && total) 
    {
        amountElem.textContent = `$${tipAmount.toFixed(2)}`
        totalElem.textContent = `$${total.toFixed(2)}`
        btn.removeAttribute('disabled')
    }

}

function handleErr(e) {
    const sibling = e.previousElementSibling
    const errMsg = sibling.lastElementChild

    if(parseFloat(e.value) === 0) 
    { 
        e.classList.add('err')
        errMsg.classList.add('show')
    }

    else 
    {
        e.classList.remove('err')
        errMsg.classList.remove('show')
    }
    
}

form.addEventListener('submit', handleReset)

form.addEventListener('input',  displayTotal)

numbers.forEach(number => 
    {
        number.addEventListener('input', (e) => handleErr(e.target))
    })


