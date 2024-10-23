PGDMP          	        	    |            inventory_db    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    24683    inventory_db    DATABASE     �   CREATE DATABASE inventory_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Indonesian_Indonesia.1252';
    DROP DATABASE inventory_db;
                postgres    false            �            1259    24850    vendor_repair    TABLE     �  CREATE TABLE public.vendor_repair (
    id integer NOT NULL,
    repair_date date,
    ticket_number character varying(255),
    engineer_name character varying(255),
    username character varying(255),
    bu_name character varying(255),
    material_name character varying(255),
    brand character varying(255),
    type character varying(255),
    serial_number character varying(255),
    cost_center character varying(255),
    pr_number character varying(255),
    po_number character varying(255),
    quotation_date date,
    cost_without numeric,
    status character varying(255),
    vendor_delivery_date date,
    remarks text
);
 !   DROP TABLE public.vendor_repair;
       public         heap    postgres    false            �            1259    24849    vendor_repair_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendor_repair_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.vendor_repair_id_seq;
       public          postgres    false    222                       0    0    vendor_repair_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.vendor_repair_id_seq OWNED BY public.vendor_repair.id;
          public          postgres    false    221            g           2604    24853    vendor_repair id    DEFAULT     t   ALTER TABLE ONLY public.vendor_repair ALTER COLUMN id SET DEFAULT nextval('public.vendor_repair_id_seq'::regclass);
 ?   ALTER TABLE public.vendor_repair ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �          0    24850    vendor_repair 
   TABLE DATA           �   COPY public.vendor_repair (id, repair_date, ticket_number, engineer_name, username, bu_name, material_name, brand, type, serial_number, cost_center, pr_number, po_number, quotation_date, cost_without, status, vendor_delivery_date, remarks) FROM stdin;
    public          postgres    false    222   �                  0    0    vendor_repair_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.vendor_repair_id_seq', 14, true);
          public          postgres    false    221            i           2606    24857     vendor_repair vendor_repair_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.vendor_repair
    ADD CONSTRAINT vendor_repair_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.vendor_repair DROP CONSTRAINT vendor_repair_pkey;
       public            postgres    false    222            �   k   x�=�A
� �ϻX��]�]�,��FERb�`����abh�Y���1�HD����|��<�e+=�/em[�k[k��+��kFR�)��Ϲ�^?Q�T?!��!���s!U     