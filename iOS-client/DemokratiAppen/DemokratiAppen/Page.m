//
//  Page.m
//  DemokratiAppen
//
//  Created by Silvia Man on 2014-01-12.
//  Copyright (c) 2014 Joakim Rydell. All rights reserved.
//

#import "Page.h"
#import <Parse/PFObject+Subclass.h>

@implementation Page

@dynamic title;
@dynamic url;
@dynamic user;
//@dynamic negative_tags;
//@dynamic positive_tags;
//@dynamic createdAt;  //generated by the system


+ (NSString*) parseClassName {
    return @"Page";
}


@end

