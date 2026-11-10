ShopBondhu AWS Assignment – Commands History
1. Connect to Public EC2

ssh -i shopbondhu.pem ubuntu@YOUR_PUBLIC_IP


2. Check Internet Connectivity
curl ifconfig.me


3. Install Nginx

sudo apt update
sudo apt install nginx -y


4. Start and Check Nginx

sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx


5. Deploy Frontend

sudo cp -r frontend/* /var/www/html/


6. Connect to Private Backend

ssh -i shopbondhu.pem ubuntu@10.0.2.137


7. Test NAT Gateway
sudo apt update
curl -I https://www.google.com

8. Verify Backend Network
ip route
ip addr


**Note:** This file should contain all actual commands executed during the assignment, in chronological order. Update the examples according to your actual commands.