#include<iostream>
#include<cstdio>
using namespace std;

class Visitor{
public:
    virtual double monthPay(Month x);
    virtual double hourPay(Hour x);
    virtual double baseCommissionPay(BaseCommission x);
};

class Pay{
public:
    double monthPay(Month x){
        return x.salary*x.time;
    }
    double hourPay(Hour x){
        return x.salary*x.time;
    }
    double baseCommissionPay(BaseCommission x){
        return x.salary*x.time;
    }
};

class Salary{
public:
    double salary;
    virtual void accept(Visitor v) = 0;
};

class Month: public Salary{
public:
    double time = 24*30;
private:
    void accept(Visitor v){
        v.monthPay(*this);
    }
};

class Hour: public Salary{
public:
    double time = 1;
private:
    void accept(Visitor v){
        v.hourPay(*this);
    }
};


class BaseCommission: public Salary{
public:
    double time = 30+10;
private:
    void accept(Visitor v){
        v.baseCommissionPay(*this);
    }
};

class Calculate{
public:
    double calculatePay(){
        //未实现
    }
    double calculateDeduction(){
        //未实现
    }
};
