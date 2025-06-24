
        let selectedCar = null;
        let bookingData = {};

        // Sample car data - you can replace this with API call
        const carTypes = [
            {
                type: 'Sedan',
                icon: '🚗',
                features: ['Air Conditioning', '4 Passengers', 'Comfortable Seating', 'Professional Driver'],
                basePrice: 12
            },
            {
                type: 'SUV',
                icon: '🚙',
                features: ['Spacious Interior', '6-7 Passengers', 'Large Luggage Space', 'Premium Comfort'],
                basePrice: 18
            },
            {
                type: 'AUV',
                icon: '🚐',
                features: ['Multi-Purpose Vehicle', '8-9 Passengers', 'Extra Luggage Space', 'Group Travel'],
                basePrice: 22
            }
        ];

        function setMinDate() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('date').setAttribute('min', today);
        }

        function validateForm() {
            const name = document.getElementById('name').value.trim();
            const mobile = document.getElementById('mobile').value.trim();
            const from = document.getElementById('from').value.trim();
            const to = document.getElementById('to').value.trim();
            const date = document.getElementById('date').value;

            if (!name || !mobile || !from || !to || !date) {
                alert('Please fill in all fields before checking prices.');
                return false;
            }

            // Basic mobile number validation
            const mobileRegex = /^[0-9]{10}$/;
            if (!mobileRegex.test(mobile.replace(/\D/g, '').slice(-10))) {
                alert('Please enter a valid 10-digit mobile number.');
                return false;
            }

            return true;
        }

        function calculateDistance(from, to) {
            // This is a mock calculation. In a real app, you'd use a mapping API
            // to calculate actual distance
            const mockDistance = Math.floor(Math.random() * 50) + 10; // 10-60 km
            return mockDistance;
        }

        async function checkPrices() {
            if (!validateForm()) return;

            // Store booking data
            bookingData = {
                name: document.getElementById('name').value.trim(),
                mobile: document.getElementById('mobile').value.trim(),
                from: document.getElementById('from').value.trim(),
                to: document.getElementById('to').value.trim(),
                date: document.getElementById('date').value
            };

            // Calculate distance (mock)
            const distance = calculateDistance(bookingData.from, bookingData.to);
            
            // Show loading state
            const btn = document.querySelector('.check-prices-btn');
            btn.innerHTML = 'Calculating...';
            btn.disabled = true;

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Reset button
            btn.innerHTML = 'Check Prices';
            btn.disabled = false;

            // Generate car cards
            const carsGrid = document.getElementById('carsGrid');
            carsGrid.innerHTML = '';

            carTypes.forEach((car, index) => {
                const price = Math.round(car.basePrice * distance);
                const cardHTML = `
                    <div class="car-card" onclick="selectCar(${index}, ${price}, ${distance})">
                        <div class="car-type">
                            <div class="car-icon">${car.icon}</div>
                            ${car.type}
                        </div>
                        <ul class="car-features">
                            ${car.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                        <div class="car-price">₹${price}</div>
                        <div style="text-align: center; color: #666; font-size: 0.9rem; margin-bottom: 15px;">
                            Distance: ~${distance} km
                        </div>
                        <button class="select-car-btn">Select This Car</button>
                    </div>
                `;
                carsGrid.innerHTML += cardHTML;
            });

            // Show prices section
            document.getElementById('pricesSection').style.display = 'block';
            document.getElementById('pricesSection').scrollIntoView({ behavior: 'smooth' });
        }

        function selectCar(carIndex, price, distance) {
            // Remove previous selection
            document.querySelectorAll('.car-card').forEach(card => {
                card.classList.remove('selected');
            });

            // Add selection to clicked card
            document.querySelectorAll('.car-card')[carIndex].classList.add('selected');

            selectedCar = {
                ...carTypes[carIndex],
                price: price,
                distance: distance
            };

            // Show inquiry section
            showInquirySection();
        }

        function showInquirySection() {
            const selectedCarInfo = document.getElementById('selectedCarInfo');
            selectedCarInfo.innerHTML = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; text-align: left;">
                    <div>
                        <h4 style="color: #2c3e50; margin-bottom: 10px;">Trip Details</h4>
                        <p><strong>From:</strong> ${bookingData.from}</p>
                        <p><strong>To:</strong> ${bookingData.to}</p>
                        <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}</p>
                        <p><strong>Distance:</strong> ~${selectedCar.distance} km</p>
                    </div>
                    <div>
                        <h4 style="color: #2c3e50; margin-bottom: 10px;">Selected Vehicle</h4>
                        <p><strong>Type:</strong> ${selectedCar.type} ${selectedCar.icon}</p>
                        <p><strong>Total Price:</strong> <span style="color: #e74c3c; font-size: 1.2rem; font-weight: bold;">₹${selectedCar.price}</span></p>
                    </div>
                    <div>
                        <h4 style="color: #2c3e50; margin-bottom: 10px;">Customer Details</h4>
                        <p><strong>Name:</strong> ${bookingData.name}</p>
                        <p><strong>Mobile:</strong> ${bookingData.mobile}</p>
                    </div>
                </div>
            `;

            document.getElementById('inquirySection').style.display = 'block';
            document.getElementById('inquirySection').scrollIntoView({ behavior: 'smooth' });
        }

        async function sendInquiry() {
            const btn = document.querySelector('.send-inquiry-btn');
            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            // Prepare inquiry data
            const inquiryData = {
                ...bookingData,
                carType: selectedCar.type,
                price: selectedCar.price,
                distance: selectedCar.distance,
                timestamp: new Date().toISOString()
            };

            try {
                // Here you would make an API call to your backend
                // Example:
                // const response = await fetch('/api/send-inquiry', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(inquiryData)
                // });

                // For demo purposes, we'll simulate the API call
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Show success message
                document.getElementById('successMessage').style.display = 'block';
                document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });

                // Reset button
                btn.innerHTML = 'Inquiry Sent ✓';
                btn.style.background = '#27ae60';

                // Log the data that would be sent to backend
                console.log('Inquiry data that would be sent to backend:', inquiryData);

                // Example WhatsApp message format
                const whatsappMessage = `
                    New Taxi Booking Inquiry:
                    👤 Name: ${inquiryData.name}
                    📱 Mobile: ${inquiryData.mobile}
                    📍 From: ${inquiryData.from}
                    📍 To: ${inquiryData.to}
                    📅 Date: ${new Date(inquiryData.date).toLocaleDateString()}
                    🚗 Car Type: ${inquiryData.carType}
                    💰 Price: ₹${inquiryData.price}
                    📏 Distance: ~${inquiryData.distance} km
                                    `.trim();

                console.log('WhatsApp message format:', whatsappMessage);

            } catch (error) {
                console.error('Error sending inquiry:', error);
                alert('There was an error sending your inquiry. Please try again.');
                btn.innerHTML = 'Send Inquiry';
                btn.disabled = false;
            }
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            setMinDate();
        });