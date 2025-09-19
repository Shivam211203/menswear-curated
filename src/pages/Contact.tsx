import { Phone, Mail, MapPin, MessageCircle, Clock, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

const Contact = () => {
  const { items, totalPrice } = useCart();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Get in Touch
            </h1>
            <p className="text-xl opacity-90 animate-fade-in">
              Ready to complete your purchase? Contact us through any of the methods below.
            </p>
          </div>
        </div>
      </section>

      {/* Order Summary */}
      {items.length > 0 && (
        <section className="py-8 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Store className="h-5 w-5 text-primary" />
                  Your Order Summary
                </h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.selectedSize} • {item.selectedColor} • Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4 text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-primary">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Contact Information</h2>
              <p className="text-muted-foreground text-lg">
                Choose your preferred way to reach us and complete your order
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* WhatsApp */}
              <Card className="group hover:shadow-medium transition-all duration-300 animate-fade-in">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
                  <p className="text-muted-foreground mb-4">Quick and easy ordering</p>
                  <p className="font-semibold text-lg mb-4">+91 98765 43210</p>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => window.open('https://wa.me/919876543210?text=Hi, I want to place an order', '_blank')}
                  >
                    Message on WhatsApp
                  </Button>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card className="group hover:shadow-medium transition-all duration-300 animate-fade-in">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Phone className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Phone Call</h3>
                  <p className="text-muted-foreground mb-4">Speak directly with us</p>
                  <p className="font-semibold text-lg mb-4">+91 98765 43210</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open('tel:+919876543210')}
                  >
                    Call Now
                  </Button>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="group hover:shadow-medium transition-all duration-300 animate-fade-in md:col-span-2 lg:col-span-1">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Mail className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground mb-4">Send us your order details</p>
                  <p className="font-semibold text-lg mb-4">orders@mensfashion.com</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open('mailto:orders@mensfashion.com?subject=New Order', '_blank')}
                  >
                    Send Email
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Store Information */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Store Details */}
              <Card className="animate-fade-in">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <Store className="h-6 w-6 text-primary" />
                    Store Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-muted-foreground">
                          123 Fashion Street, Commercial Complex<br />
                          Mumbai, Maharashtra 400001<br />
                          India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Store Hours</p>
                        <p className="text-muted-foreground">
                          Mon-Sat: 10:00 AM - 8:00 PM<br />
                          Sunday: 11:00 AM - 6:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="animate-fade-in">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-6">Location</h3>
                  <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Interactive map coming soon</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => window.open('https://maps.google.com/?q=Fashion+Street+Mumbai', '_blank')}
                      >
                        View on Google Maps
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Place Your Order?</h2>
          <p className="text-xl opacity-90 mb-8">
            Contact us now and we'll help you complete your purchase
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent-hover text-accent-foreground"
              onClick={() => window.open('https://wa.me/919876543210?text=Hi, I want to place an order', '_blank')}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp Us
            </Button>
            <Link to="/">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;