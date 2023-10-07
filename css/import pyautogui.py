import pyautogui
proxy="193.108.113.168"
proxy_port="44712"
x=open("data.txt","r")
f=x.readlines()
list_of_mails=[]
for i in range(len(f)):
    strings=f[i].split()
    list_of_mails.appen([f[i][0],f[i][1]])
print(list_of_mails)