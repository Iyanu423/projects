
document.addEventListener('DOMContentLoaded', () => {
    const orderHistorySection = document.querySelector('.order-history');
    const orderHistoryData = JSON.parse(localStorage.getItem('orderHistory')) || [];

    // Clear existing content in order history section
    orderHistorySection.innerHTML = '<h3>Order History</h3>';

    if (orderHistoryData.length === 0) {
        // Show placeholder if no orders
        const noOrdersPara = document.createElement('p');
        noOrdersPara.textContent = 'No orders yet.';
        orderHistorySection.appendChild(noOrdersPara);
        return;
    }

    // Create a container for all orders
    const ordersContainer = document.createElement('div');
    ordersContainer.classList.add('orders-container');

    // Iterate over each order and render details
    orderHistoryData.forEach((order, index) => {
        const orderDiv = document.createElement('div');
        orderDiv.classList.add('order');

        // Order header with date/time
        const orderHeader = document.createElement('h4');
        orderHeader.style.marginBlockStart = '.5rem';
        orderHeader.textContent = `Order ${index + 1} - ${order.date}`;
        orderDiv.appendChild(orderHeader);

        // List of items in the order
        const itemsList = document.createElement('ul');
        itemsList.classList.add('order-items');

        order.items.forEach(item => {
            const itemLi = document.createElement('li');
            itemLi.style.listStyle = 'none';
            itemLi.style.borderBottom = '2px solid lightgray';
            itemLi.textContent = `${item.name} - Quantity: ${item.quantity} - Price: ${item.price} - Total: ${item.totalCost}`;
            itemsList.appendChild(itemLi);
        });

        orderDiv.appendChild(itemsList);
        ordersContainer.appendChild(orderDiv);
    });

    orderHistorySection.appendChild(ordersContainer);

    // New code for editable payment cards
    const paymentList = document.querySelector('.saved-payments ul');
    if (paymentList) {
        paymentList.querySelectorAll('li').forEach(li => {
            const editIcon = li.querySelector('.edit-icon');
            if (editIcon) {
                editIcon.style.cursor = 'pointer';
                editIcon.addEventListener('click', () => {
                    // Prevent multiple inputs
                    if (li.querySelector('input')) return;

                    // Get current card text (excluding edit icon)
                    const cardText = li.childNodes[0].textContent.trim();

                    // Create input field
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = cardText;
                    input.classList.add('edit-input');

                    // Create save button
                    const saveButton = document.createElement('button');
                    saveButton.textContent = 'Save';
                    saveButton.classList.add('save-button');

                    // Clear existing text nodes except edit icon
                    while (li.firstChild && !li.firstChild.classList?.contains('edit-icon')) {
                        li.removeChild(li.firstChild);
                    }

                    // Insert input and save button before edit icon
                    li.insertBefore(input, editIcon);
                    li.insertBefore(saveButton, editIcon);

                    // Save button click handler
                    saveButton.addEventListener('click', () => {
                        const newValue = input.value.trim();
                        if (newValue.length === 0) {
                            alert('Payment card value cannot be empty.');
                            return;
                        }
                        // Remove input and save button
                        li.removeChild(input);
                        li.removeChild(saveButton);

                        // Update text node with new value
                        li.insertBefore(document.createTextNode(newValue + ' '), editIcon);
                    });
                });
            }
        });
    }
});
