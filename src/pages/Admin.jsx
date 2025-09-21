import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [productForm, setProductForm] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
    affiliateLink: ""
  });
  const { toast } = useToast();

  const handleAuth = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Access granted",
        description: "Welcome to the admin panel",
      });
    } else {
      toast({
        title: "Access denied",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field, value) => {
    setProductForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddProduct = (type) => {
    // TODO: Add product to data source
    console.log(`Adding ${type} product:`, productForm);
    toast({
      title: "Product added",
      description: `${type} product has been added successfully`,
    });
    
    // Reset form
    setProductForm({
      title: "",
      description: "",
      price: "",
      quantity: "",
      image: "",
      affiliateLink: ""
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Admin Access</CardTitle>
              <p className="text-sm text-muted-foreground">
                Enter password to access admin panel
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <Label htmlFor="password" className="text-sm">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full text-sm">
                  Access Admin Panel
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Demo password: admin123
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Panel
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your products and inventory
            </p>
          </div>

          <Tabs defaultValue="normal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="normal" className="text-sm">Normal Products</TabsTrigger>
              <TabsTrigger value="affiliate" className="text-sm">Affiliate Products</TabsTrigger>
            </TabsList>

            <TabsContent value="normal">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add Normal Product</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title" className="text-sm">Product Title</Label>
                      <Input
                        id="title"
                        value={productForm.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Enter product title"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price" className="text-sm">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        placeholder="0.00"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity" className="text-sm">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={productForm.quantity}
                        onChange={(e) => handleInputChange("quantity", e.target.value)}
                        placeholder="0"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="image" className="text-sm">Image URL</Label>
                      <Input
                        id="image"
                        value={productForm.image}
                        onChange={(e) => handleInputChange("image", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm">Description</Label>
                    <Textarea
                      id="description"
                      value={productForm.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Enter product description"
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <Button 
                    onClick={() => handleAddProduct("normal")}
                    className="w-full text-sm"
                    disabled={!productForm.title || !productForm.price}
                  >
                    Add Normal Product
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="affiliate">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add Affiliate Product</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="affiliate-title" className="text-sm">Product Title</Label>
                      <Input
                        id="affiliate-title"
                        value={productForm.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Enter product title"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="affiliate-price" className="text-sm">Price ($)</Label>
                      <Input
                        id="affiliate-price"
                        type="number"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        placeholder="0.00"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="affiliate-link" className="text-sm">Affiliate Link</Label>
                      <Input
                        id="affiliate-link"
                        value={productForm.affiliateLink}
                        onChange={(e) => handleInputChange("affiliateLink", e.target.value)}
                        placeholder="https://example.com/product"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="affiliate-image" className="text-sm">Image URL</Label>
                      <Input
                        id="affiliate-image"
                        value={productForm.image}
                        onChange={(e) => handleInputChange("image", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="affiliate-description" className="text-sm">Description</Label>
                    <Textarea
                      id="affiliate-description"
                      value={productForm.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Enter product description"
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <Button 
                    onClick={() => handleAddProduct("affiliate")}
                    className="w-full text-sm"
                    disabled={!productForm.title || !productForm.affiliateLink}
                  >
                    Add Affiliate Product
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;